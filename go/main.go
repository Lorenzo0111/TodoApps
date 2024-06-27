package main

import (
    "encoding/json"
    "log"
    "net/http"
    "github.com/gorilla/mux"
    "os"
    "fmt"
    "github.com/joho/godotenv"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

type Todo struct {
    ID       uint   `json:"id" gorm:"primaryKey"`
    Title    string `json:"title"`
    Complete bool   `json:"complete"`
}

var db *gorm.DB
var err error

func main() {
    log.Println("Starting application...")

    if err := godotenv.Load(); err != nil {
      log.Fatalf("Error loading .env file: %v", err)
    }

    dbUser := os.Getenv("DB_USER")
    dbPassword := os.Getenv("DB_PASSWORD")
    dbName := os.Getenv("DB_NAME")
    dbHost := os.Getenv("DB_HOST")
    dbPort := os.Getenv("DB_PORT")

    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbHost, dbPort, dbName)
    db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }

    log.Println("Database connected")

    if err := db.AutoMigrate(&Todo{}); err != nil {
        log.Fatalf("Failed to migrate database: %v", err)
    }

    log.Println("Database migrated")

    r := mux.NewRouter()
    r.HandleFunc("/list", getTodos).Methods("GET")
    r.HandleFunc("/create", createTodo).Methods("POST")
    r.HandleFunc("/complete", completeTodo).Methods("PATCH")

    log.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", r); err != nil {
        log.Fatalf("Server failed to start: %v", err)
    }
}

func getTodos(w http.ResponseWriter, r *http.Request) {
    var todos []Todo
    db.Find(&todos)

    json.NewEncoder(w).Encode(todos)
}

func createTodo(w http.ResponseWriter, r *http.Request) {
    var todo Todo

    if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    db.Create(&todo)

    json.NewEncoder(w).Encode(todo)
}

func completeTodo(w http.ResponseWriter, r *http.Request) {
    var input struct {
        ID   uint `json:"id"`
        Done bool `json:"done"`
    }

    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    var todo Todo
    db.First(&todo, input.ID)

    todo.Complete = input.Done
    db.Save(&todo)

    json.NewEncoder(w).Encode(todo)
}
