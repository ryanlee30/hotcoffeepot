function fillInSlot(joinedPlayer, serverPlayerSlots, clientPlayerSlots) {
    for (let i = 0; i < serverPlayerSlots.length; i++) {
        if (!serverPlayerSlots[i]) {
            serverPlayerSlots[i] = joinedPlayer;
            clientPlayerSlots[i] = {name: joinedPlayer.getName(), score: 0, slotNumber: i+1, isJudge: i+1 === 1};
            break;
        }
    }
}

function removeFromSlot(leavingPlayer, playerSlots) {
    playerSlots[playerSlots.indexOf(leavingPlayer)] = null;
}

module.exports = { fillInSlot, removeFromSlot };