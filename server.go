package main

import (
	"flag"     //Get command line arguments
	"fmt"      //Print stuff
	"net/http" //Host the server
	"os"       //Read files
)

var missionFilePath string
var doAlert bool

func main() {
	//test for cl arguments
	missionFlag := flag.String("m", "", "path to the mission js file")
	portFlag := flag.String("p", "1337", "which port to run the server on")
	localhostFlag := flag.Bool("l", false, "run only on localhost")
	alertFlag := flag.Bool("a", false, "turn off alerts when the hacker pokes something")

	flag.Parse() //activate flags

	doAlert = !*alertFlag //when the flag is present, it's true, so we need to invert it to make it false

	// See if the mission file requested exists
	missionFilePath = *missionFlag
	if missionFilePath == "" {
		fmt.Println("You didn't specify a mission file!")
		fmt.Println("Select one like this: hack_slash_run.exe -m=path/to/mission.js")
		os.Exit(1)
	}
	if _, err := os.Stat(missionFilePath); os.IsNotExist(err) {
		fmt.Printf("The mission file you requested (%s) doesn't exist!\n", missionFilePath)
		fmt.Println("Note the mission file is with respect to the root folder.")
		os.Exit(1)
	}

	//Setup server
	mux := http.NewServeMux()

	missionfs := http.FileServer(missionFileSystem{http.Dir(".")})
	docfs := http.FileServer(http.Dir("./docs"))

	mux.HandleFunc("/send_data", handleDmMessage)          //If it's a DM message, handle it there...
	mux.Handle("/docs/", http.StripPrefix("/docs", docfs)) //...and the documentation...
	mux.Handle("/GO_MISSION", missionfs)                   //...the mission...
	mux.Handle("/", http.FileServer(http.Dir("./client"))) //...and the client

	//Setup the port
	port := ":" + *portFlag
	if *localhostFlag {
		port = "localhost" + port
	}
	fmt.Println("Serving data at", port)

	if err := http.ListenAndServe(port, mux); err != nil {
		panic(err) // AAAAAAHHHH!HH!!HH!H!!!!!1!!
	}
}

func handleDmMessage(w http.ResponseWriter, r *http.Request) {
	//This function is called when send_dm gets called.
	r.ParseMultipartForm(16384)
	fmt.Println(">>>", r.FormValue("msg"))
	if doAlert {
		fmt.Print("\a") //Send a bell sound (a for alert). Hopefully this also works on Mac...
	}
}

type missionFileSystem struct {
	//Used to help serve GO_MISSION
	fs http.FileSystem
}

func (mfs missionFileSystem) Open(path string) (http.File, error) {
	//This is a little bloated but I can't figure out a way to always serve the mission file
	//without a custom handler.
	file, err := mfs.fs.Open(missionFilePath)
	if err != nil { //!!!!!!!
		fmt.Println("Error serving:", err)
		return nil, err
	}
	return file, nil
}
