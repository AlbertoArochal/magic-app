export const ColorScroll = () => {
    const colors = ['blue', 'white', 'green', 'black', 'red'];
    return (
        <div className="ColorScroll__container">
            {colors.map((color, index) => {
                return (
                    <div
                        className="ColorScroll__button"
                        key={index}
                        style={{ backgroundColor: color }}
                    >
                        <h2 className="ColorScroll__title">{color}</h2>
                    </div>
                );
            })}
        </div>
    );
};
