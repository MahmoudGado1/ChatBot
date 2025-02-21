import { useState } from "react";

const Chat1 = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      const botReply = {
        text: getBotResponse(input),
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes("hello")) return "Hi there! How can I help?";
    if (lowerCaseMessage.includes("help")) return "Sure! What do you need help with?";
    return "I'm not sure, but I'll try to assist you!";
  };

  return (
    <section className="relative h-[100vh] flex items-center mt-20 justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[500px]">
        <h1 className="text-2xl font-bold mb-4 text-center">Customer Support Chatbot</h1>
        <div className="h-[300px] overflow-y-auto border p-2 rounded mb-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                msg.sender === "bot" ? "bg-indigo-200 self-start" : "bg-blue-200 self-end ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default Chat1;
