package main

import (
	"fmt"
	"net/http"
	"encoding/json"
)

type Message struct {
	ID int `json:"id"`
	Content string `json:"content"`
}

func handleMessages(messages []Message) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(messages); err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
}

}

func main() {
		messages := []Message{
			{ID: 1, Content: "Hello, blah!"},
			{ID: 2, Content: "Blahblah blah blahblah?"},
	}

	//routes
	mux := http.NewServeMux()
	mux.HandleFunc("/api/messages", handleMessages(messages))
	mux.Handle("/", http.FileServer(http.Dir("./static")))

	//server
	server := &http.Server{
		Addr: ":8080",
		Handler: mux,
	}

	// start
	fmt.Println("Server is running on localhost, port 8080")
	if err := server.ListenAndServe(); err != nil {
		fmt.Println("Error starting server:", err)
	}
}