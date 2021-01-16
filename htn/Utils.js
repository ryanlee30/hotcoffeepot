function fillInSlot(joinedPlayer, playerSlots) {
    for (let i = 0; i < playerSlots.length; i++) {
        if (!playerSlots[i]) {
            playerSlots[i] = joinedPlayer;
            // returns player's position in slots, 1-based
            return i+1;
        }
    }
}

function removeFromSlot(leavingPlayer, playerSlots) {
    playerSlots[playerSlots.indexOf(leavingPlayer)] = null;
}

module.exports = { fillInSlot, removeFromSlot };