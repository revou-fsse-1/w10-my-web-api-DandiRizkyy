// 1. membuat UI element
// 2. mengambil data dari api
// 3. rendering element
// 4. update method untuk api (get, post, put, delete)

//membuat UI untuk tempat data yang berhasil diambil dari api
mainUI = document.querySelector("#main-content").innerHTML = `
<div>
<h1 class="text-4xl font-bold text-center">Welcome !</h1>
<div id="main-container">
</div>
</div>

`;

//mengambil id main-container yang nantinya akan diupdate isinya dengan input dan button
document.querySelector("#main-container").innerHTML = `
<div class="mt-3 md:mx-10 flex justify-center">
<input type="text" placeholder="" id="input-search" class="border p-1 rounded-md border-black"/>
<button id="button-show" class="border bg-blue-300 rounded-md p-1 font-medium text-black hover:bg-blue-600 hover:text-slate-200 px-2">Show</button>
<button id="button-search" class="border bg-green-300 rounded-md p-1 font-medium text-black hover:bg-green-600 hover:text-slate-200 px-2">Search</button>
</div>
<div id="grid-content" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3"></div>
`;

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
