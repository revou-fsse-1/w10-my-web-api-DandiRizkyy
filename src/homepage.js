// 1. membuat UI element
// 2. mengambil data dari api
// 3. rendering element
// 4. update method untuk api (get, post, put, delete)

//membuat UI untuk tempat data yang berhasil diambil dari api
mainUI = document.querySelector("#main-content").innerHTML = `
<div class="mx-auto my-20 bg-slate-100 rounded-3xl border max-w-screen-lg px-4 py-16 sm:px-6 lg:px-8 border-black shadow-2xl shadow-black">
<h1 class="text-4xl font-extrabold text-center text-gray-800">Welcome to Cat Paradise ! 😸</h1>
<div id="main-container">
</div>
</div>

`;

//mengambil id main-container yang nantinya akan diupdate isinya dengan input dan button
document.querySelector("#main-container").innerHTML = `
<div class="mt-3 md:mx-10 flex flex-wrap justify-center">
<input type="text" placeholder="" id="input-search" class="w-1/2 rounded-lg border border-black-300 p-4 pr-12 text-sm shadow-md"/>
<button id="button-show" class="border bg-blue-300 rounded-md p-1 font-medium text-black hover:bg-blue-600 hover:text-slate-200 px-2">Show</button>
<button id="button-search" class="border bg-green-300 rounded-md p-1 font-medium text-black hover:bg-green-600 hover:text-slate-200 px-2">Search</button>
<button id="button-delete" class="border bg-red-300 rounded-md p-1 font-medium text-black hover:bg-red-600 hover:text-slate-200 px-2 mt-6 sm:mt-0">Delete</button>
</div>
<div id="modal-window" class="mt-4"></div>
<div id="modal-update" class="mt-4"></div>
<div id="grid-content" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3"></div>
`;

//mengambil id modal-window yang nantinya digunakan untuk memunculkan window baru dan digunakan untuk proses create data
document.querySelector("#modal-window").innerHTML = `
<div class="flex items-center justify-center h-full">
  <button class="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-700" onclick="toggleModal()">Add Data</button>
</div>
<div class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <label>Name</label>
        <input type="text" id="name-modal" class="w-full bg-gray-100 p-2 mt-2 mb-3" />
        <label>Url</label>
        <input type="text" id="url-modal" class="w-full bg-gray-100 p-2 mt-2 mb-3" />
        <p>You can use this dummy url: https://loremflickr.com/640/484/cats</p>
      </div>
      <div class="bg-gray-200 px-4 py-3 text-right">
        <button class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onclick="toggleModal()"><i class="fas fa-times"></i> Cancel</button>
        <button  id="button-create" class="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-700 mr-2"><i class="fas fa-plus"></i> Create</button>
      </div>
    </div>
  </div>
</div>
`;

//mengambil id modal-update yang nantinya digunakan untuk memunculkan window baru dan digunakan untuk proses update data
document.querySelector("#modal-update").innerHTML = `
<div class="flex items-center justify-center h-full">
  <button class="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-700" onclick="toggleModalUpdate()">Update Data</button>
</div>
<div class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal-update-body">
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <label>Input Target ID (example 1, 2, 3, 16 etc)</label>
      <input type="text" id="id-modal-update" class="w-full bg-gray-100 p-2 mt-2 mb-3" />
        <label>Name</label>
        <input type="text" id="name-modal-update" class="w-full bg-gray-100 p-2 mt-2 mb-3" />
        <label>Url</label>
        <input type="text" id="url-modal-update" class="w-full bg-gray-100 p-2 mt-2 mb-3" />
        <p>You can use this dummy url: https://loremflickr.com/640/484/cats</p>
      </div>
      <div class="bg-gray-200 px-4 py-3 text-right">
        <button class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onclick="toggleModalUpdate()"><i class="fas fa-times"></i> Cancel</button>
        <button id="button-update" class="py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-700 mr-2"><i class="fas fa-plus"></i> Update</button>
      </div>
    </div>
  </div>
</div>
`;

//fungsi toggle untuk modal window
function toggleModal() {
  document.getElementById("modal").classList.toggle("hidden");
}
function toggleModalUpdate() {
  document.getElementById("modal-update-body").classList.toggle("hidden");
}

//mengambil id grid-content yang nantinya akan diupdate dan diisi list data dari API (Rendering UI)
const renderMainContent = function (data) {
  const renderData = document.querySelector("#grid-content");
  const renderHTMLElement = data
    .map((data) => {
      return `
              <div class="border border-black text-center rounded-lg bg-slate-50">
              <img src="${data.image}" class="object-cover"/>
              <h3 class="mt-4 text-lg font-bold text-gray-900 mb-4" >${data.name}</h3>
              </div>
              `;
    })
    .join("");
  renderData.innerHTML = renderHTMLElement;

  // dummy data
  // .innerHTML = `
  // <div class="bg-red-500">HAI</div>
  // <div class="bg-red-500">HAI</div>
  // <div class="bg-red-500">HAI</div>
  // <div class="bg-red-500">HAI</div>
  // <div class="bg-red-500">HAI</div>
  // <div class="bg-red-500">HAI</div>
  // <div class="bg-red-500">HAI</div>
  // <div class="bg-red-500">HAI</div>
  // `;
};

//mendapatkan data dari mockapi (METHOD GET)
const getAllCatsData = async (keyword) => {
  API_ENDPOINT = "https://642649bbd24d7e0de46d2a61.mockapi.io/cats/";
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//mendapatkan data dari mockapi (METHOD GET BY ID)
const getCatsDataById = async (id) => {
  API_ENDPOINT = "https://642649bbd24d7e0de46d2a61.mockapi.io";
  try {
    const response = await fetch(`${API_ENDPOINT}/cats/${id}`);
    const data = await response.json();
    return [data];
  } catch (error) {
    console.log(error);
  }
};

//mendapatkan data dari mockapi (METHOD POST)
const addCatsData = async (add) => {
  API_ENDPOINT = "https://642649bbd24d7e0de46d2a61.mockapi.io/cats/";
  const inputModalName = document.querySelector("#name-modal").value;
  const inputUrlModal = document.querySelector("#url-modal").value;
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputModalName,
        image: inputUrlModal,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//mendapatkan data dari mockapi (METHOD DELETE)
const deleteCatData = async (id) => {
  const API_ENDPOINT = "https://642649bbd24d7e0de46d2a61.mockapi.io";
  try {
    const response = await fetch(`${API_ENDPOINT}/cats/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//mendapatkan data dari mockapi (METHOD PUT)
const updateCatsData = async (id, newData) => {
  const API_ENDPOINT = "https://642649bbd24d7e0de46d2a61.mockapi.io";
  try {
    const inputIdModal = document.querySelector("#id-modal-update").value;
    const inputModalName = document.querySelector("#name-modal-update").value;
    const inputUrlModal = document.querySelector("#url-modal-update").value;

    const response = await fetch(`${API_ENDPOINT}/cats/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputModalName,
        image: inputUrlModal,
        id: inputIdModal,
      }),
    });
    const data = await response.json(newData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// dummy data (tadinya kode ini digunakan untuk menghapus id ketika tombol delete ditekan, eh malah kehapus semua :") wkwkkwk")
// const deleteCatData = async () => {
//   const API_ENDPOINT = "https://642649bbd24d7e0de46d2a61.mockapi.io/cats";

//   try {
//     const response = await fetch(API_ENDPOINT);
//     const data = await response.json();

//     for (let i = 0; i < data.length; i++) {
//       const catId = data[i].id;
//       const deleteResponse = await fetch(`${API_ENDPOINT}/${catId}`, {
//         method: "DELETE",
//       });
//       const deleteData = await deleteResponse.json();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

//mengambil id #button-show, ketika tombol show di klik maka akan menjalankan fungsi renderMainContent() dan akan menampilkan seluruh list data dari mockapi
document
  .querySelector("#button-show")
  .addEventListener("click", async function () {
    const data = await getAllCatsData();
    console.log(data);
    renderMainContent(data);
  });

//mengambil id #button-search dan #input-search, ketika value dimasukkan dan tombol search ditekan. Maka fungsi renderMainContent() akan dijalankan dan hanya menampilkan hanya ID data dari mockapi
document
  .querySelector("#button-search")
  .addEventListener("click", async function () {
    const input = document.querySelector("#input-search").value;
    const data = await getCatsDataById(input);
    console.log(data);
    renderMainContent(data);
  });

//mengambil id #button-create didalam box modal atau window baru untuk nantinya ketika tombol ditekan akan mengirimkan data baru ke mockapi
//dummy url agar imagenya tampil : https://loremflickr.com/640/484/cats
document
  .querySelector("#button-create")
  .addEventListener("click", async function () {
    const data = await addCatsData();
    console.log(data);
    alert("DATA BERHASIL DIBUAT!");
  });

// mengambil id #button-delete yang nantinya ketika user memasukkan id kedalam input field dan menekan tombol delete, maka id yang bersangkutan didalam mockapi akan terhapus
document
  .querySelector("#button-delete")
  .addEventListener("click", async function () {
    const input = document.querySelector("#input-search").value;
    const data = await deleteCatData(input);
    console.log(data);
    alert("DATA BERHASIL DIHAPUS !");
  });

//mengambil id #button-update yang nantinya ketika user memasukkan id dan data lainnya di dalam box modal atau window baru, data tersebut akan mengupdate data sebelumnya di dalam mockapi
document
  .querySelector("#button-update")
  .addEventListener("click", async function () {
    const inputIdModal = document.querySelector("#id-modal-update").value;
    const inputModalName = document.querySelector("#name-modal-update").value;
    const inputUrlModal = document.querySelector("#url-modal-update").value;

    const data = await updateCatsData(inputIdModal, {
      name: inputModalName,
      image: inputUrlModal,
    });
    console.log(data);
    alert("DATA BERHASIL DI UPDATE!");
  });
