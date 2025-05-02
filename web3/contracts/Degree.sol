// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title UniversityDegreeSBT
 * @dev A simplified contract for minting soul-bound tokens (SBTs) representing degree certificates
 *      SBTs are non-transferable NFTs that represent permanent credentials
 */
contract UniversityDegreeSBT is ERC721 {
    uint256 private _currentTokenId;
    address public owner;

    // Mapping from token ID to IPFS hash containing the metadata
    mapping(uint256 => string) public tokenURIs;

    // Mapping from student address to token IDs
    mapping(address => uint256[]) public studentDegrees;

    // Event emitted when a degree is minted
    event DegreeMinted(
        address indexed minter,
        address indexed student,
        uint256 tokenId,
        string tokenURI
    );

    // Event emitted when metadata is updated
    event DegreeMetadataUpdated(uint256 indexed tokenId, string newTokenURI);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() ERC721("University Degree SBT", "DEGREE") {
        owner = msg.sender;
        _currentTokenId = 0;
    }

    /**
     * @dev Function to mint a degree certificate SBT
     * @param to The student's address who will receive the certificate
     * @param metadataURI The IPFS URI containing the degree metadata
     * @return The token ID of the minted certificate
     */
    function mintDegree(
        address to,
        string calldata metadataURI
    ) external returns (uint256) {
        uint256 tokenId = _currentTokenId++;

        _mint(to, tokenId);
        tokenURIs[tokenId] = metadataURI;

        // Record that this student received this degree
        studentDegrees[to].push(tokenId);

        emit DegreeMinted(msg.sender, to, tokenId, metadataURI);

        return tokenId;
    }

    /**
     * @dev Function to update the metadata URI of an existing degree certificate
     * @param tokenId The token ID of the certificate to update
     * @param newTokenURI The new IPFS URI pointing to the updated metadata
     */
    function updateDegreeMetadata(
        uint256 tokenId,
        string calldata newTokenURI
    ) external {
        require(_ownerOf(tokenId) != address(0), "Certificate does not exist");
        require(
            msg.sender == owner || msg.sender == _ownerOf(tokenId),
            "Not authorized to update"
        );

        tokenURIs[tokenId] = newTokenURI;
        emit DegreeMetadataUpdated(tokenId, newTokenURI);
    }

    /**
     * @dev Function to get degrees and their metadata held by a student
     * @return tokenIds Array of token IDs
     * @return uris Array of metadata URIs corresponding to the token IDs
     */
    function getStudentDegrees(
        address student
    ) external view returns (uint256[] memory tokenIds, string[] memory uris) {
        tokenIds = studentDegrees[student];
        uris = new string[](tokenIds.length);
        
        for (uint i = 0; i < tokenIds.length; i++) {
            uris[i] = tokenURIs[tokenIds[i]];
        }
        
        return (tokenIds, uris);
    }

    /**
     * @dev Returns the metadata URI for a given token ID
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Certificate does not exist");
        return tokenURIs[tokenId];
    }

    /**
     * @dev Override _update to prevent transfers (making it a soul-bound token)
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);
        // Allow minting (from == address(0)) but prevent transfers
        require(
            from == address(0) || to == address(0),
            "Token is SOUL BOUND: cannot be transferred"
        );
        return super._update(to, tokenId, auth);
    }

    /**
     * @dev Override approve to prevent approvals (part of making it soul-bound)
     */
    function approve(
        address /* to */,
        uint256 /* tokenId */
    ) public pure override {
        revert("Token is SOUL BOUND: cannot be approved for transfer");
    }

    /**
     * @dev Override setApprovalForAll to prevent approvals (part of making it soul-bound)
     */
    function setApprovalForAll(
        address /* operator */,
        bool /* approved */
    ) public pure override {
        revert("Token is SOUL BOUND: cannot be approved for transfer");
    }
}
