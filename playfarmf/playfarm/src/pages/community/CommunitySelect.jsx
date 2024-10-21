import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faComments, faHandshake, faPalette } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_BASE_URL } from '../../service/app-config';



const customStyles = {
    control: (provided) => ({
        ...provided,
        padding: '0px 15px',
        border: '2px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        color: '#333',
        cursor: 'pointer',
        width: '200px'
    }),
    option: (provided, state) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        color: state.isSelected ? '#333' : '#000',
        width: '200px'
    }),
    singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        width: '200px'
    }),
    menu: (provided) => ({
        ...provided,
        width: '200px'
    }),
};

const CommunitySelect = ({ value, onChange }) => {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchTypeList = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/code/typelist`);
                const option = response.data.map((option) => {
                    let icon;
                    let label;
                    switch (option.codeId) {
                        case 'find': {
                            value = option.codeId;
                            label = "유저찾기";
                            icon = <FontAwesomeIcon icon={faHandshake} />
                            break;
                        }

                        case 'question': {
                            value = option.codeId;
                            label = "질문";
                            icon = <FontAwesomeIcon icon={faCircleQuestion} />
                            break;
                        }
                        case 'fanart': {
                            value = option.codeId;
                            label = "팬아트";
                            icon = <FontAwesomeIcon icon={faPalette} />
                            break;
                        }
                        default: {
                            value = option.codeId;
                            label = "자유";
                            icon = <FontAwesomeIcon icon={faComments} />
                            break;
                        }
                    }
                    // return { ...option,value, label, icon };
                    return { value: option.codeId, label, icon };
                });
                setOptions(option);
            } catch (err) {
                alert("게시물타입을 불러오는것을 실패하였습니다.");
            }
        }
        fetchTypeList();
    }, []);


    const formatOptionLabel = ({ label, icon }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
            {label}
        </div>
    );

    return (
        <Select
            value={value}
            onChange={onChange}
            options={options}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}

        />
    );
};

export default CommunitySelect;
