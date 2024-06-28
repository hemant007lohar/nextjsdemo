export const Column = ({ children, width, textColor, backgroundColor }) => {
    const textColorStyle = textColor ? { color: textColor } : {};
    const backgroundColorStyle = backgroundColor ? { backgroundColor: backgroundColor } : {};
    const widthStyle = width ? { minWidth: width, flexGrow: 1 } : { flexGrow: 1, flexBasis: 0 };
    
    // Combine styles correctly using curly braces around the spread operator
    const combinedStyles = { ...widthStyle, ...textColorStyle, ...backgroundColorStyle };

    return (
        <div style={combinedStyles} className="px-2 py-5">
            {children}
        </div>
    );
};
