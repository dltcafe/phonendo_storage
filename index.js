import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

console.log("Phonendo Storage Initialization");

socket.on("connect", () => {
    console.log(socket.id);

    //fake
    socket.emit("reader_new_data", 5);
});

socket.on("disconnect", () => {
    console.log("Disconnected ", socket.id);
});

// Receives raw data from Phonendo Manager - Model and save data
socket.on("storage_save_data_raw", (data) => {
    console.log("Raw data received from Manager");
    console.log(data);
    //model it
    // storage it
    let json = {
        data: 5
    };
    socket.emit("storage_return_data_raw", json);
});

// Receives processed data from Phonendo Manager to be saved
socket.on("storage_save_data_processed", (data) => {
    console.log("Processed data received from Manager");
    console.log(data);
    //model it
    // storage it
    let json = {
        data: 5
    };
    socket.emit("storage_return_data_processed", json);
});