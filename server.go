package main

import (
	"flag"      //Get command line arguments
	"fmt"       //Print stuff
	"io/ioutil" //Read files
	"net/http"  //Host the server
	"os"        //Stop the program

	//Parsing
	"github.com/shurcooL/github_flavored_markdown"
	"github.com/shurcooL/github_flavored_markdown/gfmstyle"
)

var missionFilePath string
var doAlert bool

func main() {
	//test for cl arguments
	missionFlag := flag.String("m", "", "path to the mission js file")
	portFlag := flag.String("p", "1337", "which port to run the server on")
	localhostFlag := flag.Bool("l", false, "run only on localhost")
	alertFlag := flag.Bool("a", false, "turn off alert sound when the hacker pokes something")

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
		fmt.Println("Note: the mission file is with respect to the root folder.")
		os.Exit(1)
	}

	//Setup server
	mux := http.NewServeMux()

	missionfs := http.FileServer(missionFileSystem{http.Dir(".")})

	mux.HandleFunc("/send_data", handleDmMessage)                                         //If it's a DM message, handle it there...
	mux.HandleFunc("/docs/", handleDocs)                                                  //...and the documentation...
	mux.Handle("/GO_MISSION", missionfs)                                                  //...the mission...
	mux.Handle("/", http.FileServer(http.Dir("./client")))                                //...and the client
	mux.Handle("/assets/", http.StripPrefix("/assets", http.FileServer(gfmstyle.Assets))) //Serve the github-style css

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

func handleDocs(w http.ResponseWriter, r *http.Request) {
	//This function is called to serve back the Markdown as HTML
	path := r.URL.Path
	if path == "/docs/" { //if there wasn't a file specified, default to index.md
		path = "/docs/index.md"
	}
	path = "." + path //make sure we're talking about this folder, not root

	mdBytes, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Println("!!ERROR reading the markdown file:", err)
		os.Exit(1)
	}

	//literal for the HTML hader
	w.Write([]byte(`<html><head><meta charset="utf-8"><link href="/assets/gfm.css" media="all" rel="stylesheet" type="text/css" /><link href="//cdnjs.cloudflare.com/ajax/libs/octicons/2.1.2/octicons.css" media="all" rel="stylesheet" type="text/css" /></head><body><article class="markdown-body entry-content" style="padding: 30px;">`))
	w.Write(github_flavored_markdown.Markdown(mdBytes))
	w.Write([]byte(`</article></body></html>`))
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
		fmt.Println("!!ERROR serving:", err)
		return nil, err
	}
	return file, nil
}
