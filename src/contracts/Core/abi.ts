import { AbiItem } from 'web3-utils';

export const ABI: AbiItem[] = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "configuration_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "permitPeriphery_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "oracle",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "percent",
                "type": "uint256"
              },
              {
                "internalType": "enum ICore.OrderDirectionType",
                "name": "direction",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "reinvest",
                "type": "bool"
              }
            ],
            "internalType": "struct ICore.OrderDescription",
            "name": "data",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserved",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "available",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "closed",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct ICore.Order",
        "name": "order",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deviationPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "protocolFee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountCreator",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountAccepter",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "winner",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isCreatorWinner",
            "type": "bool"
          },
          {
            "internalType": "enum ICore.PositionStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "indexed": false,
        "internalType": "struct ICore.Position",
        "name": "position",
        "type": "tuple"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Accepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "winner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "protocolStableFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "autoResolveFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "referralID",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "activeId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "team",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "discount",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "enum IFoxifyAffiliation.Level",
                "name": "level",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "randomValue",
                "type": "bytes32"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct IFoxifyAffiliation.NFTData",
            "name": "nftData",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct ICoreUtilities.AffiliationUserData",
        "name": "affiliation",
        "type": "tuple"
      }
    ],
    "name": "AutoResolved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FeeClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "Flashloan",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "oracle",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "percent",
                "type": "uint256"
              },
              {
                "internalType": "enum ICore.OrderDirectionType",
                "name": "direction",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "reinvest",
                "type": "bool"
              }
            ],
            "internalType": "struct ICore.OrderDescription",
            "name": "data",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserved",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "available",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "closed",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct ICore.Order",
        "name": "order",
        "type": "tuple"
      }
    ],
    "name": "OrderClosed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "oracle",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "percent",
                "type": "uint256"
              },
              {
                "internalType": "enum ICore.OrderDirectionType",
                "name": "direction",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "reinvest",
                "type": "bool"
              }
            ],
            "internalType": "struct ICore.OrderDescription",
            "name": "data",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserved",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "available",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "closed",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct ICore.Order",
        "name": "order",
        "type": "tuple"
      }
    ],
    "name": "OrderCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "OrderIncreased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "OrderWithdrawal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DIVIDER",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accepter",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "orderId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "bytes[]",
            "name": "updateData",
            "type": "bytes[]"
          }
        ],
        "internalType": "struct ICore.Accept[]",
        "name": "data",
        "type": "tuple[]"
      }
    ],
    "name": "accept",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "positionIds",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "positionId",
        "type": "uint256"
      },
      {
        "internalType": "bytes[]",
        "name": "updateData",
        "type": "bytes[]"
      }
    ],
    "name": "autoResolve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "availableFeeAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "claimFee",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      }
    ],
    "name": "closeOrder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "configuration",
    "outputs": [
      {
        "internalType": "contract ICoreConfiguration",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "counters",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "ordersCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "positionsCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalStableAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct ICore.Counters",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "address",
            "name": "oracle",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "percent",
            "type": "uint256"
          },
          {
            "internalType": "enum ICore.OrderDirectionType",
            "name": "direction",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "rate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "duration",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "reinvest",
            "type": "bool"
          }
        ],
        "internalType": "struct ICore.OrderDescription",
        "name": "data",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "createOrder",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "creatorOrdersCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "creatorToOrders",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "flashloan",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "increaseOrder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      }
    ],
    "name": "orderIdPositionsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orderIdToPositions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "orders",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "oracle",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "percent",
                "type": "uint256"
              },
              {
                "internalType": "enum ICore.OrderDirectionType",
                "name": "direction",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "rate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "reinvest",
                "type": "bool"
              }
            ],
            "internalType": "struct ICore.OrderDescription",
            "name": "data",
            "type": "tuple"
          },
          {
            "internalType": "address",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserved",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "available",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "closed",
            "type": "bool"
          }
        ],
        "internalType": "struct ICore.Order",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "permitPeriphery",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "positionIdToOrderId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "positions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deviationPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "protocolFee",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountCreator",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountAccepter",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "winner",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isCreatorWinner",
            "type": "bool"
          },
          {
            "internalType": "enum ICore.PositionStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct ICore.Position",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "orderId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawOrder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
