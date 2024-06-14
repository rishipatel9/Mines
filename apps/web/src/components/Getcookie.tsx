import axios from 'axios';

const Getcookie = () => {
        const fetchCookie = async () => {
            try {
                const res = await axios.get('http://localhost:3000/get-cookie', { withCredentials: true });
                console.log(res.data);
            } catch (error) {
                console.error("Error while fetching cookie", error);
            }
        };
    return (
        <div>
            <button onClick={fetchCookie}>get cookie</button>
        </div>
    );
}

export default Getcookie
