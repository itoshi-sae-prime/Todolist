const ChangeColorButton = ({ color, setColor }: { color: string, setColor: React.Dispatch<React.SetStateAction<string>> }) => {
    const handleChangesColor = () => {
        setColor(color);
    }
    return (
        <>
            <button className={`h-[30px] w-[30px] rounded-[25px] p-[20px] bg-${color} border-2 border-white`} onClick={handleChangesColor}></button >
        </>
    )
}
export default ChangeColorButton;