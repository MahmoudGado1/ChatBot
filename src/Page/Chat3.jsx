import { useState } from "react";

const Chat3 = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you with HR-related queries today?", sender: "bot" },
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
    if (lowerCaseMessage.includes("leave")) return "You can apply for leave through the HR portal. Would you like a direct link?";
    if (lowerCaseMessage.includes("onboarding")) return "New employees can access onboarding materials in their email or the HR dashboard.";
    if (lowerCaseMessage.includes("policy")) return "You can find company policies in the employee handbook or on the HR portal.";
    if (lowerCaseMessage.includes("benefits")) return "Employee benefits include health insurance, retirement plans, and paid time off. Need more details?";
    return "I'm not sure, but I'll try to assist you!";
  };

  return (
    <section className="relative h-[100vh] flex items-center mt-20 justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[500px]">
        <h1 className="text-2xl font-bold mb-4 text-center">HR Assistant Chatbot</h1>
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

export default Chat3;
