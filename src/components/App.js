import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import Header from "./Header";
import Home from "./Home";
import Receipt from "./Receipt";
import Seats from "./Seats";
import Sessions from "./Sessions";

export default function App(){
    const [movie, setMovie] = useState({
        movieName: ""
    });

    const [session, setSession] = useState({
        id0: "",
        ids: [],
        day: "",
        time: ""
    });

    const [client, setClient] = useState({
        nameClient: "",
        cpf: ""
    })
    
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sessions/:idMovie" element={<Sessions />} />
                <Route path="/seats/:idSession" element={<Seats setSession={setSession} setMovie={setMovie} setClient={setClient}/>} />
                <Route path="/receipt" element={<Receipt session={session} movie={movie} client={client}/>} />
            </Routes>
        </BrowserRouter>
    )
}

