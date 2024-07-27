const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const rooms = {};

module.exports = {
    openConnection: async () => {
        wss.on("connection", (ws) => {
            console.log("Client connected");

            ws.on("message", (message) => {
                // Join a room
                const room = message;
                if (!rooms[room]) {
                    rooms[room] = new Set();
                }
                rooms[room].add(ws);

                if (rooms[room]) {
                    rooms[room].forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({ type: "message", message: "hello_world" }));
                        }
                    });
                    console.log(`Message sent to room ${room}`);
                } else {
                    console.log(`Room ${room} does not exist`);
                }

                console.log(`Client joined room ${room}`);
            });

            // Handle client disconnect
            ws.on("close", () => {
                console.log("Client disconnected");
                // Remove client from all rooms
                for (const room in rooms) {
                    rooms[room].delete(ws);
                }
            });
        });
    },
    sendMessageToDriver: async (message, room) => {
        // Function to send a message to a specific room
        if (rooms[room]) {
            rooms[room].forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: "message", message }));
                }
            });
            console.log(`Message sent to room ${room}`);
        } else {
            console.log(`Room ${room} does not exist`);
        }
    },
};
