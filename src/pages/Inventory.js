import React from 'react'
import InventoryList from '../components/inventory/InventoryList'
import NewItemButton from '../components/newItem/NewItemButton'

export default function Inventory() {
    return (
        <div>
            <h1>JMU Pop-up Pantry Inventory</h1>
            {/* New Item Button inside of header */}
            <NewItemButton />
            <InventoryList />
        </div>
    )
}
