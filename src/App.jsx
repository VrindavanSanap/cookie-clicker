import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import cookie_image from "./assets/cookie.png";
import nom_sound from "./assets/nom.mp3";
function get_cookie(cookie_name) {
  const total_cookies = document.cookie.split(";");
  for (let cookie of total_cookies) {
    cookie = cookie.trim();
    const [cookie_name_i, cookie_value_i] = cookie.split("=");
    if (cookie_name_i === cookie_name) {
      return cookie_value_i || ""; // Return empty string if value is undefined
    }
  }
  return null; // Return null if cookie is not found
}

function App() {
  const [cookie_count, set_cookie_count] = useState(0);

  function handle_empty_jar_btn_click() {
    set_cookie_count(() => {
      const new_count = 0;
      console.log(`Cookie clicked ${new_count} times`); // Logging updated count
      document.cookie = `n_cookies=${new_count};`;
      return new_count;
    });
 
  }
  useEffect(() => {
    const prev_cookie = parseInt(get_cookie("n_cookies"));
    if (prev_cookie){

      set_cookie_count(prev_cookie);
    }
  }, []);

  function handle_cookie_clicked() {
    set_cookie_count((prev_count) => {
      const new_count= prev_count+ 1;
      console.log(`Cookie clicked ${new_count} times`); // Logging updated count
       document.cookie = `n_cookies=${new_count};`;
      return new_count;
    });
    const sound = new Audio(nom_sound);

    sound.play();
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold mb-4 mt-10">
        Cookie Clicker
      </h1>
      <div className="cookie_div flex flex-col items-center">
        <div className="cookie_count" style={{ cursor: "pointer" }}>
          Cookie clicked {cookie_count} times
        </div>
        <div className="h-[300px]">
          <img
            onClick={handle_cookie_clicked}
            className="cookie_img"
            src={cookie_image}
            alt="Cookie"
          />
        </div>
        <div>
          <button
            type="button"
            className="mt-20 bg-amber-100 text-brown py-2 px-4 rounded border-2 border-solid border-amber-600 hover:bg-amber-200 hover:text-brown-dark hover:border-amber-800 transition-colors duration-300"
            onClick={handle_empty_jar_btn_click}
          >
            Empty cookie jar
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
