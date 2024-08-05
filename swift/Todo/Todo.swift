//
//  Item.swift
//  Todo
//
//  Created by Lorenzo on 03/08/24.
//

import Foundation
import SwiftData

@Model
final class Todo {
    var name: String
    
    init(name: String) {
        self.name = name
    }
}
