import { Link } from "react-router-dom"

function Subscribe() {
    return (
        <>
            {/* subscribe */}
            <section className="subscribe">
                <h2>welcome to the club</h2>
                <p>send a line here get and update daily. </p>
                <Link href="javascript:void(0)" className="btn-them">
                    subscribe
                </Link>
            </section>
        </>

    )
}

export default Subscribe
