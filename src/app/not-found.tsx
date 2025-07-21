
'use client'

import './css/not-found.css'

export default function NotFound() {
    return (
        <>
            <div className="error">404</div>
            <br /><br />
            <span className="info">File not found</span>
            <img src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif" className="static" />
        </>
    )
}
