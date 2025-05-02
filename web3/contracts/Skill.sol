// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SkillBadge
 * @dev NFT contract for skill badges with IPFS metadata storage
 */
contract SkillBadge is ERC721URIStorage, Ownable {
    // Current token ID counter
    uint256 private _currentTokenId;

    // Mapping from tokenId to skill name
    mapping(uint256 => string) public tokenSkills;

    // Mapping from user address and skill to tokenId
    mapping(address => mapping(string => uint256)) public userSkillBadges;

    // Mapping from user address to all their token IDs
    mapping(address => uint256[]) public userTokens;

    // Define the struct for badge data
    struct BadgeInfo {
        uint256 tokenId;
        string skill;
        string metadataUri;
    }

    // Events
    event BadgeMinted(
        address indexed owner,
        uint256 indexed tokenId,
        string skill,
        string metadataURI
    );

    event BadgeUpdated(
        uint256 indexed tokenId,
        string skill,
        string newMetadataURI
    );

    constructor() ERC721("Skill Badge", "SKILL") Ownable(msg.sender) {
        _currentTokenId = 0; // Start from 0
    }

    /**
     * @dev Mint a new badge for a skill with IPFS metadata
     * @param to Address to mint the badge to
     * @param skill The programming language or skill
     * @param metadataURI The IPFS URI containing the badge metadata
     * @return The new token ID
     */
    function mintBadge(
        address to,
        string memory skill,
        string memory metadataURI
    ) public onlyOwner returns (uint256) {
        require(
            userSkillBadges[to][skill] == 0,
            "User already has a badge for this skill"
        );

        _currentTokenId++; // Increment token ID
        uint256 newTokenId = _currentTokenId;

        tokenSkills[newTokenId] = skill;
        userSkillBadges[to][skill] = newTokenId;
        userTokens[to].push(newTokenId);

        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, metadataURI);

        emit BadgeMinted(to, newTokenId, skill, metadataURI);

        return newTokenId;
    }

    /**
     * @dev Update badge metadata URI
     * @param tokenId The token ID to update
     * @param newMetadataURI The new IPFS metadata URI
     */
    function updateBadgeMetadata(
        uint256 tokenId,
        string memory newMetadataURI
    ) public onlyOwner {
        require(_exists(tokenId), "Badge does not exist");

        _setTokenURI(tokenId, newMetadataURI);

        emit BadgeUpdated(tokenId, tokenSkills[tokenId], newMetadataURI);
    }

    /**
     * @dev Gets a user's badge for a specific skill
     * @param user The user's address
     * @param skill The skill to query
     * @return tokenId and metadata URI
     */
    function getUserSkillBadge(
        address user,
        string memory skill
    ) external view returns (uint256 tokenId, string memory metadataURI) {
        tokenId = userSkillBadges[user][skill];
        require(tokenId > 0, "User doesn't have a badge for this skill");

        metadataURI = tokenURI(tokenId);
        return (tokenId, metadataURI);
    }

    /**
     * @dev Gets all badges owned by a user
     * @param user The user's address
     * @return badges Array of BadgeInfo structs
     */
    function getUserBadges(
        address user
    ) external view returns (BadgeInfo[] memory badges) {
        uint256[] memory userTokensList = userTokens[user];
        uint256 badgeCount = userTokensList.length;

        badges = new BadgeInfo[](badgeCount);

        for (uint256 i = 0; i < badgeCount; i++) {
            uint256 tokenId = userTokensList[i];
            badges[i] = BadgeInfo({
                tokenId: tokenId,
                skill: tokenSkills[tokenId],
                metadataUri: tokenURI(tokenId)
            });
        }

        return badges;
    }

    /**
     * @dev Check if a token exists (for internal use)
     * @param tokenId The token ID to check
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}
