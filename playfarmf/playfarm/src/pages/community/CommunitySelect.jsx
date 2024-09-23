import React from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faComments, faHandshake, faPalette } from '@fortawesome/free-solid-svg-icons';

export const options = [
    { value: 'find', label: '유저찾기', icon: <FontAwesomeIcon icon={faHandshake} /> },
    { value: 'free', label: '자유', icon: <FontAwesomeIcon icon={faComments} /> },
    { value: 'question', label: '질문', icon: <FontAwesomeIcon icon={faCircleQuestion} /> },
    { value: 'fanArt', label: '팬아트', icon: <FontAwesomeIcon icon={faPalette} /> },
];

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
