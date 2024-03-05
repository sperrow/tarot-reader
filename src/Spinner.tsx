import './Spinner.css';

function Spinner() {
    return (
        <div className="w-full h-full fixed top-0 left-0 z-10 bg-slate-500/75">
            <div className="flex justify-center mt-80">
                <span className="loader"></span>
            </div>
        </div>
    );
}

export default Spinner;
