import React from "react";
// import Icons from "../../assets/icons/icons.svg"; // Path to your icons.svg
import PropTypes from 'prop-types';

const SvgArt = ({ svg,name, color, size }:any) => (
    <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
        <use xlinkHref={`${svg}`} />
    </svg>
);

SvgArt.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
};

export default SvgArt;
