export default function FoodCard({restaurant}: {restaurant: any})
{
    return (
        <div className="h-20 overflow-auto">
           {
            restaurant.map((restaurant: any) => (
                <div>
                    <p className="w-80 overflow-hidden">{restaurant.name}</p>
                    <p className="w-80 overflow-hidden">{restaurant.vicinity}</p>
                </div>
            ))
           }
        </div>
    )
}