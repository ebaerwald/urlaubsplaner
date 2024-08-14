export default function SightsCard({tourist_attraction}: {tourist_attraction: any})
{
    return (
        <div className="h-20 overflow-auto">
            {
                tourist_attraction.map((tourist_attraction: any) => (
                    <div>
                        <p className="w-80 overflow-hidden">{tourist_attraction.name}</p>
                        <p className="w-80 overflow-hidden">{tourist_attraction.vicinity}</p>
                    </div>
                ))
            }
        </div>
    )
}