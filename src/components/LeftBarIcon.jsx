function LeftBarIcon({shape}){
    return <div 
                style={styles.iconNode} 
                onDragStart={(event) => onDragStart(event, 'textNode')} 
                draggable>
                Input Node
            </div>
}