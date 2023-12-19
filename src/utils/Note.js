import axios from "axios";
import Swal from "sweetalert2";

export function showAddModal({ tokenUser, updater }) {

  Swal.fire({
    title: "Add Note",
    html: `
        <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control"/>
        <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3"></textarea>
        `,

    showCancelButton: true,
    confirmButtonText: "Add",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    const title = result.value.title;
    const content = result.value.content;
    sendDataToAddNote({ title, content, tokenUser, updater });
  });
}

async function sendDataToAddNote({ title, content, tokenUser, updater }) {
  try {
    const { data } = await axios.post(
      "https://note-sigma-black.vercel.app/api/v1/notes",
      { title, content },
      { headers: { token: tokenUser } }
    );
    getDataToAddNote({ tokenUser, updater })
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.log(error);
  }
}


export async function getDataToAddNote({ tokenUser, updater }) {

  try {
    const { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, { headers: { token: tokenUser } });
    updater(data.notes)
  } catch (error) {
    updater([])

  }
}




export function showDeleteModal({ id, tokenUser, updater }) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteNote({ id, tokenUser, updater })


    }
  });
}

export async function deleteNote({ id, tokenUser, updater }) {
  try {
    const { data } = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, { headers: { token: tokenUser } })
    getDataToAddNote({ tokenUser, updater })
    Swal.fire({
      title: "Deleted!",
      text: "Your Note has been deleted.",
      icon: "success"
    });
  } catch (error) {
    console.log(error);
  }
}

export function updateNote({prevTitle,prevContent,id, tokenUser,updater}) {
  Swal.fire({
    title: "Update Note",
    html: `
        <input type="text" placeholder="Enter a Title" id="title" name="title" value="${prevTitle}" class="form-control"/>
        <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3">${prevContent}</textarea>
        `,

    showCancelButton: true,
    confirmButtonText: "Update",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    const title = result.value.title;
    const content = result.value.content;
    afterUpdate({title, content, id, tokenUser,updater})
  });
}

async function afterUpdate({title, content, id, tokenUser,updater}) {
  const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, { title, content }, { headers: { token: tokenUser } })
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
  });
  getDataToAddNote({tokenUser,updater})
}