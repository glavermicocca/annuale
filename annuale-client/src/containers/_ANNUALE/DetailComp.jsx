import React, { useState, useEffect } from 'react'

export default function DetailComp({ row }) {
    const [state, setstate] = useState([])
    useEffect(() => {
        fetch(`/art_um2`).then(res => res.json()).then(res => {
            console.log(res)
            setstate(res)
        }).catch((err) => console.log(err))
        return () => {

        }
    }, [])

    return (
        <div>
            {row.COD_ART}
            {state.map(item => item.a + ' ' + item.b)}
        </div>
    )
}
