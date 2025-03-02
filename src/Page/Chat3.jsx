import React, { useEffect, useState, useRef } from "react";
import fetchAPI from "../components/api";
import { format } from "date-fns";
import { FaPlus, FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

const Chat3 = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const [chatName, setChatName] = useState(""); // State for adding chat
  const [editChatName, setEditChatName] = useState(""); // State for editing chat
  const [editingChatId, setEditingChatId] = useState(null); // Track chat being edited

  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedChat]);
  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await fetchAPI("chat", "GET", null);
        const filteredChats = data.filter((chat) => chat.type === "type_3");
        setChats(filteredChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    loadChats();
  }, []);

  const handleSelectChat = async (chat) => {
    const chatExists = chats.find((c) => c.id === chat.id);
    if (!chatExists) {
      console.error("Selected chat does not exist or was deleted.");
      setSelectedChat(null);
      setMessages([]);
      return;
    }

    setSelectedChat(chat);
    setMessages([]);

    try {
      const chatDetails = await fetchAPI(`chat/${chat.id}/`);
      if (chatDetails?.messages?.length) {
        const formattedMessages = chatDetails.messages.flatMap((message) => [
          { text: message.question, sender: "user" },
          { text: message.response, sender: "bot" },
        ]);
        setMessages(formattedMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      if (error.message.includes("No Chat matches the given query")) {
        setChats((prevChats) => prevChats.filter((c) => c.id !== chat.id));
        setSelectedChat(null);
        setMessages([]);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedChat || loading) return;
    setLoading(true);

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    try {
      const data = await fetchAPI("message/", "POST", {
        question: input,
        chat: selectedChat.id,
      });

      if (data && data.response) {
        setMessages((prev) => [
          ...prev,
          { text: data.response, sender: "bot" },
        ]);
      } else {
        console.error("No response from API:", data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await fetchAPI(`chat/${chatId}/`, "DELETE");
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));

      if (selectedChat?.id === chatId) {
        setSelectedChat(null);
        setMessages([]);
      }
      toast.success("Chat deleted successfully!");
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleAddChat = async () => {
    try {
      const newChat = await fetchAPI("chat/", "POST", {
        name: chatName || "New Chat",
        type: "type_3",
      });
      setChats((prev) => [newChat, ...prev]);
      setChatName("");
      toast.success("Chat added successfully!");
    } catch (error) {
      console.error("Error adding chat:", error);
    }
  };

  const handleUpdateChat = async (chatId) => {
    if (!editChatName.trim()) {
      toast.error("Chat name cannot be empty!");
      return;
    }

    try {
      const updatedChat = await fetchAPI(`chat/${chatId}/`, "PUT", {
        name: editChatName,
        type: "type_3",
      });

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, ...updatedChat } : chat
        )
      );

      setEditingChatId(null);
      setEditChatName("");
      toast.success("Chat updated successfully!");
    } catch (error) {
      console.error("Error updating chat:", error);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="h-screen flex flex-col md:flex-row bg-gray-100">
      <button
        className="md:hidden mt-28 bg-indigo-500 text-white p-5 text-center"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Chat List" : "Open Chat List"}
      </button>

      <div
        className={`w-full mt-24 md:w-1/4 bg-white shadow-md p-4 border-r md:static absolute top-0 left-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex mt-10 justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Enter chat name..."
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="border p-2 rounded w-full mr-2"
          />
          <button
            onClick={handleAddChat}
            className="bg-green-500 text-white p-2 rounded"
          >
            <FaPlus />
          </button>
        </div>

        <ul
          className={`max-h-[400px] transition-all ${
            chats.length > 5 && !menuOpen
              ? "overflow-y-auto"
              : "overflow-visible"
          }`}
        >
          {" "}
          {chats.length > 0 ? (
            chats.map((chat) => (
              <li
                key={chat.id}
                className={`flex justify-between items-center p-3 cursor-pointer rounded mb-2 ${
                  selectedChat?.id === chat.id
                    ? "bg-indigo-200"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleSelectChat(chat) && setSidebarOpen(false)}
              >
                <span>
                  <strong>{chat.name}</strong>
                  <p className="text-xs text-gray-500">
                    {format(new Date(chat.updated_at), "PPpp")}
                  </p>
                </span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setMenuOpen(menuOpen === chat.id ? null : chat.id)
                    }
                    className="text-gray-600"
                  >
                    <FaEllipsisV />
                  </button>
                  {menuOpen === chat.id && (
                    <div className="absolute right-0 mt-2 w-40 z-40 bg-white shadow-md rounded-md py-1 ">
                      {editingChatId === chat.id ? (
                        <div className="flex p-2">
                          <input
                            type="text"
                            className="border p-1 rounded w-full"
                            value={editChatName}
                            onChange={(e) => setEditChatName(e.target.value)}
                          />
                          <button
                            onClick={() =>
                              handleUpdateChat(chat.id) && setMenuOpen(false)
                            }
                            className="bg-blue-500 text-white p-1 rounded ml-1"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingChatId(chat.id);
                              setEditChatName(chat.name);
                            }}
                            className="flex items-center gap-2 px-3 py-1 text-blue-500 w-full hover:bg-gray-200"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteChat(chat.id)}
                            className="flex items-center gap-2 px-3 py-1 text-red-500 w-full hover:bg-gray-200"
                          >
                            <FaTrash /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No chats available</p>
          )}
        </ul>
      </div>

      <div className="w-full md:w-3/4 flex flex-col items-center justify-center p-4">
        <div className="mt-24 max-md:mt-0 bg-gray-100 p-6 w-full max-w-full">
          <h2 className="text-2xl font-bold mt-10 mb-4 text-center text-indigo-600">
            {selectedChat ? selectedChat.name : "Select a Chat"}
          </h2>

          <div
            ref={chatRef}
            className="h-[400px] max-md:h-[300px] overflow-y-auto p-3 rounded bg-gray-100 mb-4 w-full"
          >
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "bot"
                      ? "bg-indigo-200 self-start"
                      : "bg-blue-200 self-end ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No messages yet</p>
            )}
          </div>

          <div className="flex gap-2 w-full">
            <input
              ref={inputRef}
              type="text"
              className="border rounded p-2 w-full text-sm md:text-base"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading || !selectedChat}
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded text-sm md:text-base disabled:opacity-50"
              onClick={handleSendMessage}
              disabled={loading || !selectedChat}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat3;
