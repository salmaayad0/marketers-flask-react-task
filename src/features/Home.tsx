import React, { useEffect, useState } from 'react'
import { DARK_COL, LIGHT_COL, Table_STYLE, Head_table } from "../styles/style"
import axios from 'axios';

interface projectProps {
    id: number;
    title: string;
    description: string;
    difference: number;
    user: string;

}

const URL ='http://127.0.0.1:5000/projects'

const Home = () => {
    const [projects, setProjects] = useState<projectProps[]>([])

    useEffect(()=>{ 
        axios.get(URL)
            .then(response => setProjects(response.data.projects))
            .catch(err => console.log(err))
    },[])

    
    
  return (
    <div className={Table_STYLE}>
          <table className={Head_table}>
              <thead >
                  <tr>
                    <th scope="col" className={DARK_COL}>ID</th>
                      <th scope="col" className={LIGHT_COL}>Title</th>
                      <th scope="col" className={DARK_COL}>Description</th>
                      <th scope="col" className={LIGHT_COL}>Time</th>
                      <th scope="col" className={DARK_COL}>User</th>
              </tr>
          </thead>
          <tbody>
              {projects.map( project => (
                  <tr key={project.id}>
                      <td className={DARK_COL}>{project.id}</td>
                      <td className={LIGHT_COL}>{project.title}</td>
                      <td className={DARK_COL}>{project.description}</td>
                      <td className={LIGHT_COL}>{project.difference}%</td>
                      <td className={DARK_COL}>{project.user}</td>
                  </tr>
              ))} 
          </tbody>
      </table>
      </div>
  )
}

export default Home;