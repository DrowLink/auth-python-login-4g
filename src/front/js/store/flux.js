const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userEmail: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      token: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      login: async (email, password) => {
        const store = getStore();

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/token",
            options
          );
          if (resp.status !== 200) {
            alert("There has been some error");
            return false;
          }
          const data = await resp.json();
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("email", JSON.stringify(data.email));
          console.log(data);
          setStore({ token: data.access_token });
          setStore({ userEmail: data.email });
          return true;
        } catch (error) {
          console.error("There has been an error login in");
        }
      },
    },
  };
};

export default getState;
