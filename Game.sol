// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Game {

    address payable public player1;
    address payable public player2;

    uint Score = 0;
    bool turn;

    function Be_First_Player() external payable {

        // require(player2 != msg.sender, "can't play as both");
        // require(player1 == address(0), "position taken");
        // require(msg.value >= 1 ether, "bet must be more then 0 ether");
        player1 = payable( msg.sender);

    }
    function Be_Second_Player() external payable {

        // require(player1 != msg.sender, "can't play as both");
        // require(player2 == address(0), "position taken");
        // require(msg.value >= 1 ether, "bet must be more then 0 ether");
        player2 = payable(msg.sender);
    }

    function Skaicius(uint256 moves) external
    {
        require(player1 != address(0) && player2 != address(0),"need both players to play");
        require(moves >= 1 && moves <= 100);
        if(turn==false)
        {
            require(msg.sender==player1, "you're not player1");
        }
        else
        {
            require(msg.sender==player2, "you're not player2");
        }

        Score = Score + moves;
        Nugaletojas();
    }

    function Nugaletojas() public payable
    {
        
        uint256 t = turn?2:1;
        turn = ! turn;
        bool winner = false;

        if(Score >= 100)
        {
            winner = true;
            Score = 0;
        }

        if(winner)
        {
            if(t==1)
            {
                player1.transfer(address(this).balance);
            }
            if(t==2)
            {
                player2.transfer(address(this).balance);
            }
            player1 = payable(address(0));
            player2 = payable(address(0));
            turn = false;
        }

    }

    function getBoard() external view returns (uint256){
        return Score;
    }
    function checkJackpot() external view returns(uint256){
        return address(this).balance;
    }

}