const Stake = (props) => {

    const objectArray = Object.entries(props.data).map(([key, value]) => ({ 
        key,
        value: value.toString(), // Convert BigNumber to string
      }));

      return (
        <div>
          {/* Using map to render the array of key-value pairs */}
           {objectArray.slice(-3).map(({ key, value }) => (
            <h3 key={key}>
              {key}: {value}
            </h3>
          ))}
        </div>
      );
}
 
export default Stake;