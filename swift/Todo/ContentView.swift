//
//  ContentView.swift
//  Todo
//
//  Created by Lorenzo on 03/08/24.
//

import SwiftUI
import SwiftData

struct ContentView: View {
    @Environment(\.modelContext) private var modelContext
    @Query private var todos: [Todo]
    @State private var newItem: String = ""

    var body: some View {
        NavigationSplitView {
            List {
                ForEach(todos) { item in
                    Text(item.name)
                }
                .onDelete(perform: deleteItems)
            }
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    EditButton()
                }
            }
        } detail: {
            Text("Select an item")
        }
        
        HStack {
            TextField(
                 "Add a new todo..",
                 text: $newItem
             )
             .onSubmit {
                 addItem(name: newItem)
                 newItem = ""
             }
            
            Button(action: {
                addItem(name: newItem)
                newItem = ""
            }) {
                Label("", systemImage: "plus")
            }
        }
        .padding(.horizontal)
    }

    private func addItem(name: String) {
        withAnimation {
            let newItem = Todo(name: name)
            modelContext.insert(newItem)
        }
    }

    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(todos[index])
            }
        }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: Todo.self, inMemory: true)
}
