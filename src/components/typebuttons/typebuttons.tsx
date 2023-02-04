export const TypeButtons = () => {
    const types = ['Creatures', 'Spells', 'Enchantments', 'Artifacts', 'Lands'];
    return (
        <div className="TypeButtons">
            {types.map((type) => (
                <button className="TypeButton" key={type}>
                    {type}
                </button>
            ))}
        </div>
    );
};
