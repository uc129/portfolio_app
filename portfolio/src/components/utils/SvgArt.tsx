import React, {useEffect} from "react";

const SvgArt =  ({name, color, size }:any) => {
    const [svg, setSvg] = React.useState(null);
    useEffect(() => {
        const svgI = import(`../../../public/assets/art/${name}.svg`);
        svgI.then((svg) => setSvg(svg.default))
    })
    return (
        svg && React.cloneElement(svg, {color, size})
    )
}

export default SvgArt;
