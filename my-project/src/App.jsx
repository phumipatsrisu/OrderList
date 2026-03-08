// App.jsx
import React, { useState } from "react";
import CategorySection from "./Components/CategorySection"; // ใช้ Component เดิมที่คุณแยกไว้
import { initialProducts, tabsList } from "./Components/Data";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState("ทั้งหมด"); // State ตัวใหม่สำหรับเก็บแท็บปัจจุบัน

  const handleIncrease = (id) => {
    setProducts(
      products.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id) => {
    setProducts(
      products.map((item) =>
        item.id === id && item.qty > 0 ? { ...item, qty: item.qty - 1 } : item,
      ),
    );
  };

  const handleCopyReceipt = () => {
    const orderedItems = products.filter((item) => item.qty > 0);
    if (orderedItems.length === 0) return alert("ยังไม่ได้เลือกสินค้าเลยครับ!");

    const today = new Date();
    let text = `${today.toLocaleDateString("th-TH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\nสั่งของ\n`;

    // ดึงเฉพาะของ general มารันเลข
    const generalItems = orderedItems.filter(
      (item) => item.receiptCategory === "general",
    );
    generalItems.forEach((item, index) => {
      text += `${index + 1}.${item.name} ${item.qty} ${item.unit}\n`;
    });

    // ดึงหมวดหมู่อื่นๆ (เช่น ถุงดาว, ถุงร้อน) มาแยกกลุ่ม
    const otherCategories = [
      ...new Set(
        orderedItems
          .filter((item) => item.receiptCategory !== "general")
          .map((item) => item.receiptCategory),
      ),
    ];
    otherCategories.forEach((category) => {
      text += `\n${category}\n`;
      const itemsInCategory = orderedItems.filter(
        (item) => item.receiptCategory === category,
      );
      itemsInCategory.forEach((item) => {
        text += `${item.name.padEnd(10, " ")} ${item.qty} ${item.unit}\n`;
      });
    });

    navigator.clipboard
      .writeText(text)
      .then(() => alert("คัดลอกเรียบร้อย! วางใน LINE ได้เลย"));
  };

  // คัดกรองสินค้าตามแท็บที่เลือก
  const displayedProducts =
    activeTab === "ทั้งหมด"
      ? products
      : products.filter((p) => p.tab === activeTab);

  // หาหมวดหมู่ย่อย (receiptCategory) ทั้งหมดของสินค้าที่ถูกกรองมา เพื่อเอาไปแสดงผล
  const currentCategories = [
    ...new Set(displayedProducts.map((p) => p.receiptCategory)),
  ];

  return (
    <div className="max-w-lg mx-auto font-sans bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold p-4 text-gray-800 text-center bg-white shadow-sm">
        จดรายการสั่งของ
      </h2>

      {/* --- ส่วนของแท็บ (Scrollable Tabs) --- */}
      <div className="sticky top-0 bg-white z-10 shadow-sm border-b border-gray-200">
        {/* เลื่อนซ้ายขวาได้ด้วย overflow-x-auto และซ่อน scrollbar ให้ดูคลีน */}
        <div className="flex overflow-x-auto gap-2 p-3 whitespace-nowrap scrollbar-hide">
          {tabsList.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- ส่วนแสดงรายการสินค้า --- */}
      <div className="p-4 space-y-8 pb-24">
        {currentCategories.map((receiptCat) => (
          <CategorySection
            key={receiptCat}
            title={receiptCat}
            items={displayedProducts.filter(
              (p) => p.receiptCategory === receiptCat,
            )}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleCopyReceipt}
          className="w-full max-w-lg mx-auto block py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-colors shadow-lg"
        >
          คัดลอกรายการสั่งของ
        </button>
      </div>
    </div>
  );
}

export default App;
