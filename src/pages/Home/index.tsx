import { useState, useEffect } from 'react'


import { Card, ICardProps } from "../../components/Card"

import "./style.css"

interface IProflileResponse {
  name: string;
  avatar_url: string;
}

interface IUser {
  name: string;
  avatar: string;
}

export function Home () {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [students, setStudents]= useState <ICardProps[]>([])
  const [studentName, setStudentName] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/oPauloJunior")
      const data = await response.json() as IProflileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    fetchData()
  }, [students])

  function handleAddStudent(){

  
  
   
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    }

    setStudents((prevState) => [...prevState, newStudent])
  }

  return (
    <div className="container">

      <header>
        <h1>Lista de presença: {studentName}</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="" />
        </div>

      </header>
      

      <input 
        type="text"
        placeholder="Digite o nome ..." 
        onChange={(e) => { setStudentName(e.target.value) }} 
      />
      <button 
        disabled={!studentName}
        onClick={handleAddStudent}
      >
        Adicionar
      </button>

      {
        students.map((student) => (
          <Card key={student.time} name={student.name} time={student.time} />
        ))
      }

      
      
      
    </div>
  )
}

