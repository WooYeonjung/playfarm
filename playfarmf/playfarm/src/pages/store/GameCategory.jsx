import React, { useEffect, useRef, useState } from 'react';
import '../../styles/GameCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

const checkboxCategory = [
    { type: 'playtype', name: 'nintendo', isChecked: false },
    { type: 'playtype', name: 'playstation', isChecked: false },
    { type: 'playtype', name: 'pc', isChecked: false },
    { type: 'tag', name: 'Survival', isChecked: false },
    { type: 'tag', name: 'FPS', isChecked: false },
    { type: 'tag', name: 'RPG', isChecked: false },
    { type: 'tag', name: 'Multiplayer', isChecked: false },
    { type: 'tag', name: 'TPS', isChecked: false },
    { type: 'tag', name: 'Action', isChecked: false },
    { type: 'tag', name: 'Cooperative', isChecked: false },
    { type: 'tag', name: 'PvP', isChecked: false },
    { type: 'tag', name: 'Horror', isChecked: false },
    { type: 'tag', name: 'Zombies', isChecked: false },
    { type: 'tag', name: 'Cute', isChecked: false },
    { type: 'tag', name: 'Adventure', isChecked: false },
    { type: 'tag', name: 'Singleplayer', isChecked: false },
    { type: 'tag', name: 'Simulation', isChecked: false },
    { type: 'tag', name: 'Aliens', isChecked: false },
    { type: 'tag', name: 'Story', isChecked: false }
];

const CheckboxCategory = ({ data, onChange }) => {
    const playtypeData = data.filter(item => item.type === 'playtype');
    const tagData = data.filter(item => item.type === 'tag');

    return (
        <>
            <h3>Playtype</h3>
            {playtypeData.map((item, idx) => (
                <div key={`${item.type}-${item.name}-${idx}`} className="checkbox-wrapper">
                    <span className="checkbox">
                        <input
                            type="checkbox"
                            name={item.type}
                            value={item.name}
                            id={`playtype-${item.name}-${idx}`}
                            checked={item.isChecked}
                            onChange={() => onChange(idx)}
                        />
                        <svg>
                            <use href="#checkbox-30" className="checkbox"></use>
                        </svg>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                        <symbol id="checkbox-30" viewBox="0 0 22 22">
                            <path fill="none" stroke="currentColor" d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2" />
                        </symbol>
                    </svg>
                    &nbsp;
                    <label htmlFor={`playtype-${item.name}-${idx}`} className='checkbox-label'>{item.name}</label>
                </div>
            ))}
            <hr />
            <h3>Tag</h3>
            {tagData.map((item, idx) => (
                <div key={`${item.type}-${item.name}-${idx}`} className="checkbox-wrapper">
                    <span className="checkbox">
                        <input
                            type="checkbox"
                            name={item.type}
                            value={item.name}
                            id={`tag-${item.name}-${idx}`}
                            checked={item.isChecked}
                            onChange={() => onChange(playtypeData.length + idx)}
                        />
                        <svg>
                            <use href="#checkbox-30" className="checkbox"></use>
                        </svg>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                        <symbol id="checkbox-30" viewBox="0 0 22 22">
                            <path fill="none" stroke="currentColor" d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2" />
                        </symbol>
                    </svg>
                    &nbsp;
                    <label htmlFor={`tag-${item.name}-${idx}`} className='checkbox-label'>{item.name}</label>
                </div>
            ))}
            <hr />
        </>
    );
};

function GameCategory({ category, setSelectcheck, theme, setTheme }) {
    const [checkData, setCheckData] = useState(() => {
        return checkboxCategory.map(item => ({
            ...item,
            isChecked: item.type === 'playtype' && item.name === category
        }));
    });

    useEffect(() => {
        setCheckData(prevData => prevData.map(item => ({
            ...item,
            isChecked: item.type === 'playtype' && item.name === category
        })));
    }, [category]);

    const handleCheckboxChange = (idx) => {
        const newData = [...checkData];
        newData[idx].isChecked = !newData[idx].isChecked;
        setCheckData(newData);

        const selectData = {
            playtype: newData.filter(item => item.type === 'playtype' && item.isChecked).map(item => item.name),
            tag: newData.filter(item => item.type === 'tag' && item.isChecked).map(item => item.name)
        };

        setSelectcheck(selectData);
    };

    const [filterVisible, setFilterVisible] = useState(true);

    const toggleFilter = () => {
        setFilterVisible(!filterVisible);
    };

    const toggleMode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }
    const FontEls = <FontAwesomeIcon icon={faSliders} size='xl' style={{ color: theme === 'light' ? '#000' : '#fff' }} />

    return (
        <div className="category_container">
            <h2>category</h2>
            <br />
            <div onClick={toggleFilter} style={{ cursor: 'pointer' }}>{FontEls}</div>
            {filterVisible && (
                <CheckboxCategory
                    data={checkData}
                    onChange={handleCheckboxChange}
                />
            )}
        </div>
    );
}

export default GameCategory;

// import { useEffect, useRef, useState } from 'react';
// import '../../styles/GameCategory.css';

// const checkboxCategory = [
//     { type: 'playtype', name: 'nintendo', isChecked: false },
//     { type: 'playtype', name: 'playstation', isChecked: false },
//     { type: 'playtype', name: 'pc', isChecked: false },
//     { type: 'tag', name: 'Survival', isChecked: false },
//     { type: 'tag', name: 'FPS', isChecked: false },
//     { type: 'tag', name: 'RPG', isChecked: false },
//     { type: 'tag', name: 'Multiplayer', isChecked: false },
//     { type: 'tag', name: 'TPS', isChecked: false },
//     { type: 'tag', name: 'Action', isChecked: false },
//     { type: 'tag', name: 'Cooperative', isChecked: false },
//     { type: 'tag', name: 'PvP', isChecked: false },
//     { type: 'tag', name: 'Horror', isChecked: false },
//     { type: 'tag', name: 'Zombies', isChecked: false },
//     { type: 'tag', name: 'Cute', isChecked: false },
//     { type: 'tag', name: 'Adventure', isChecked: false },
//     { type: 'tag', name: 'Singleplayer', isChecked: false },
//     { type: 'tag', name: 'Simulation', isChecked: false },
//     { type: 'tag', name: 'Aliens', isChecked: false }
// ];

// const CheckboxCategory = ({ data, onChange }) => {
//     return (
//         data.map((item, idx) => (
//             <div key={idx} className="checkbox-wrapper">
//                 <span className="checkbox">
//                     <input
//                         type="checkbox"
//                         name={item.type}
//                         value={item.name}
//                         id={`${item.type}-${idx}`}
//                         checked={item.isChecked}
//                         onChange={() => onChange(idx)}
//                     />
//                     <svg>
//                         <use href="#checkbox-30" className="checkbox"></use>
//                     </svg>
//                 </span>
//                 <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
//                     <symbol id="checkbox-30" viewBox="0 0 22 22">
//                         <path fill="none" stroke="currentColor" d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2" />
//                     </symbol>
//                 </svg>
//                 &nbsp;
//                 <label htmlFor={`${item.type}-${idx}`} className='checkbox-label'>{item.name}</label>
//             </div>
//         ))
//     );
// };

// // function GameCategory({setSelectcheck}) {
// //     const [checkData, setCheckData] = useState(checkboxCategory);
    

// //     const handleCheckboxChange = (idx) => {
// //         const newData = [...checkData];
// //         newData[idx].isChecked = !newData[idx].isChecked;
// //         setCheckData(newData);

// //         let selectData = {
// //             playtype: [],
// //             tag: []
// //         }

// //         checkData.forEach((check) => {
// //             if (check.type === 'playtype' && check.isChecked) {
// //                 selectData.playtype.push(check.name);
// //             }
// //             if (check.type === 'tag' && check.isChecked) {
// //                 selectData.tag.push(check.name);
// //             }
// //         })
// //         setSelectcheck(selectData)
    
// //     };
// function GameCategory({ category, setSelectcheck }) {
//     const [checkData, setCheckData] = useState(() => {
//         return checkboxCategory.map(item => ({
//             ...item,
//             isChecked: item.type === 'playtype' && item.name === category
//         }));
//     });

//     useEffect(() => {
//         setCheckData(prevData => prevData.map(item => ({
//             ...item,
//             isChecked: item.type === 'playtype' && item.name === category
//         })));
//     }, [category]);

//     const handleCheckboxChange = (idx) => {
//         const newData = [...checkData];
//         newData[idx].isChecked = !newData[idx].isChecked;
//         setCheckData(newData);

//         const selectData = {
//             playtype: newData.filter(item => item.type === 'playtype' && item.isChecked).map(item => item.name),
//             tag: newData.filter(item => item.type === 'tag' && item.isChecked).map(item => item.name)
//         };

//         setSelectcheck(selectData);
//     };

//     return (
//         <div className="category_container">
//             <h2>category</h2>
//             <br />
//             <div>   
//                 <CheckboxCategory
//                     data={checkData}
//                     onChange={handleCheckboxChange}
//                 />
//             </div>
//         </div>
//     );
// }

// export default GameCategory;
