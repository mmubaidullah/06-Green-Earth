#### 1) What is the difference between var, let, and const?
**`var`**
ফাংশন স্কোপড (function scoped)।\
পুনরায় ডিক্লেয়ার করা যায়।\
হোইস্টিং (hoisting) হয়, কিন্তু মান `undefined` থাকে।
**`let`**
ব্লক স্কোপড (block scoped)।\
পুনরায় ডিক্লেয়ার করা যায় না, তবে আপডেট করা যায়।\
হোইস্টিং হয়, কিন্তু ব্যবহার করার আগে মান অ্যাক্সেস করা যায় না।
**`const`**
ব্লক স্কোপড।\
পুনরায় ডিক্লেয়ার বা আপডেট করা যায় না।\
কনস্ট্যান্ট মান (constant value) এর জন্য ব্যবহার করা হয়।

#### 2) What is the difference between map(), forEach(), and filter()? 
**`map()`**
কটি নতুন array রিটার্ন করে।\
প্রতিটি আইটেমে অপারেশন করে নতুন মান তৈরি করে।
**`forEach()`**
কিছু রিটার্ন করে না (`undefined`)।\
শুধু প্রতিটি আইটেমে অপারেশন চালায়।
**`filter()`**
শর্ত অনুযায়ী নতুন array রিটার্ন করে।\
মূল array থেকে যেসব এলিমেন্ট শর্ত পূরণ করে শুধু সেগুলো রাখে।

#### 3) What are arrow functions in ES6?
ফাংশন লেখার শর্টকাট সিনট্যাক্স।\
`function` কীওয়ার্ড ব্যবহার না করে `=>` দিয়ে লেখা হয়।

#### 4) How does destructuring assignment work in ES6?
Destructuring Assignment ব্যবহার করে object বা array থেকে আলাদা আলাদা ভ্যারিয়েবল তৈরি করা যায়।
#### 5) Explain template literals in ES6. How are they different from string concatenation?
Template Literals হলো string লেখার নতুন syntax যেখানে ব্যাকটিক (`) ব্যবহার করা হয়।

সহজে ভ্যারিয়েবল ও expression string এর ভেতরে ব্যবহার করা যায় ${} দিয়ে।

Concatenation এ + ব্যবহার করতে হয়, কিন্তু Template Literals এ সরাসরি ${} দিয়ে ভ্যারিয়েবল বসানো যায়।

Multi-line string লেখা সহজ হয় Template Literals এ।
___________________________________________________