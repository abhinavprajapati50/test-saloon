import React, { useEffect, useState } from 'react'

export const HomeNav = ({ data }) => {
    const [navData, setnavData] = useState([])
    {console.log(data) }
    // {setnavData(data) }

    useEffect(() => setnavData(data),[] )
    return (
        <div>

            {
                navData.map((curPage, index) => (
                    <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: curPage.description }}
                    ></div>
                ))
            }

            
        </div>
    )
}
