export default function HousingCard({lodging}: {lodging: any})
{
    return (
        <div className="h-20 overflow-auto">
           {
            lodging.map((lodging: any) => (
                <div>
                    <p className="w-80 overflow-hidden">{lodging.name}</p>
                    <p className="w-80 overflow-hidden">{lodging.vicinity}</p>
                </div>
            ))
           } 
        </div>
    )
}