import React from 'react';

const Home2 = (props) => {
    console.log("ew pors  ", props.search," ",props.data)
    if(props.data!=null){
        console.log("the result ",props.data.filter(word =>word.ZipCode.includes(props.search)|| word.titile.includes(props.search)||word.district.includes(props.search)||word.division.includes(props.search)||word.upazilla.includes(props.search)))
    }
    return (
        <div>
             <h1> home 2</h1>
        </div>
    );
};

export default Home2;
// const [ProductShowCase, setProductShowCase] = useState(null);

// useEffect(() => {
//     fetch("https://still-temple-26727.herokuapp.com/addServices")
//         .then(res => res.json())
//         .then(data => {
//             console.log("data", data)
//             console.log(sort)
//             if (sort == 1) {
//                 console.log(sort)
//                 data.sort((a, b) => {
//                     return a.Price - b.Price;
//                 })
//             }
//             else if (sort == 2) {
//                 console.log(sort)
//                 data.sort((a, b) => {
//                     return b.Price - a.Price;
//                 })
//             }
//             console.log("loafd ", load)
//             setProductShowCase(data);
//             setLoad(false);
           

//         })
//         setLoad(true);
// }, [sort])


// const Ascending = () => {
//     setSort(1);
// }
// const Descending = () => {
//     setSort(2);
//     console.log("liked");
// }

//  const getSearch=()=>{
//    console.log("cliked")
// } 