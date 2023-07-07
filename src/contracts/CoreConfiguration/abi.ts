import { AbiItem } from 'web3-utils';

export const ABI: AbiItem[] = [
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'contract IFoxifyBlacklist',
            'name': 'blacklist',
            'type': 'address'
          },
          {
            'internalType': 'contract IFoxifyAffiliation',
            'name': 'affiliation',
            'type': 'address'
          },
          {
            'internalType': 'contract IPositionToken',
            'name': 'positionTokenAccepter',
            'type': 'address'
          },
          {
            'internalType': 'contract IERC20Stable',
            'name': 'stable',
            'type': 'address'
          }
        ],
        'internalType': 'struct ICoreConfiguration.ImmutableConfiguration',
        'name': 'immutableConfiguration_',
        'type': 'tuple'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'bronze',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'silver',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'gold',
            'type': 'uint256'
          }
        ],
        'internalType': 'struct ICoreConfiguration.NFTDiscountLevel',
        'name': 'discount_',
        'type': 'tuple'
      },
      {
        'components': [
          {
            'internalType': 'address',
            'name': 'feeRecipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'autoResolveFee',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'protocolFee',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'flashloanFee',
            'type': 'uint256'
          }
        ],
        'internalType': 'struct ICoreConfiguration.FeeConfiguration',
        'name': 'feeConfiguration_',
        'type': 'tuple'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'minStableAmount',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'minOrderRate',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'maxOrderRate',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'minDuration',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'maxDuration',
            'type': 'uint256'
          }
        ],
        'internalType': 'struct ICoreConfiguration.LimitsConfiguration',
        'name': 'limitsConfiguration_',
        'type': 'tuple'
      },
      {
        'components': [
          {
            'internalType': 'contract ISwapperConnector',
            'name': 'swapperConnector',
            'type': 'address'
          },
          {
            'internalType': 'bytes',
            'name': 'path',
            'type': 'bytes'
          }
        ],
        'internalType': 'struct ICoreConfiguration.Swapper',
        'name': 'swapper_',
        'type': 'tuple'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'bronze',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'silver',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'gold',
            'type': 'uint256'
          }
        ],
        'indexed': false,
        'internalType': 'struct ICoreConfiguration.NFTDiscountLevel',
        'name': 'discount_',
        'type': 'tuple'
      }
    ],
    'name': 'DiscountUpdated',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'components': [
          {
            'internalType': 'address',
            'name': 'feeRecipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'autoResolveFee',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'protocolFee',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'flashloanFee',
            'type': 'uint256'
          }
        ],
        'indexed': false,
        'internalType': 'struct ICoreConfiguration.FeeConfiguration',
        'name': 'config',
        'type': 'tuple'
      }
    ],
    'name': 'FeeConfigurationUpdated',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address[]',
        'name': 'keepers',
        'type': 'address[]'
      }
    ],
    'name': 'KeepersAdded',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address[]',
        'name': 'keepers',
        'type': 'address[]'
      }
    ],
    'name': 'KeepersRemoved',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'minStableAmount',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'minOrderRate',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'maxOrderRate',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'minDuration',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'maxDuration',
            'type': 'uint256'
          }
        ],
        'indexed': false,
        'internalType': 'struct ICoreConfiguration.LimitsConfiguration',
        'name': 'config',
        'type': 'tuple'
      }
    ],
    'name': 'LimitsConfigurationUpdated',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address[]',
        'name': 'oracles',
        'type': 'address[]'
      }
    ],
    'name': 'OraclesAdded',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address[]',
        'name': 'oracles',
        'type': 'address[]'
      }
    ],
    'name': 'OraclesRemoved',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address[]',
        'name': 'oracles',
        'type': 'address[]'
      }
    ],
    'name': 'OraclesWhitelistRemoved',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'previousOwner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipTransferred',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'components': [
          {
            'internalType': 'contract ISwapperConnector',
            'name': 'swapperConnector',
            'type': 'address'
          },
          {
            'internalType': 'bytes',
            'name': 'path',
            'type': 'bytes'
          }
        ],
        'indexed': false,
        'internalType': 'struct ICoreConfiguration.Swapper',
        'name': 'swapper',
        'type': 'tuple'
      }
    ],
    'name': 'SwapperUpdated',
    'type': 'event'
  },
  {
    'inputs': [],
    'name': 'DIVIDER',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'MAX_FLASHLOAN_FEE',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'MAX_PROTOCOL_FEE',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address[]',
        'name': 'keepers_',
        'type': 'address[]'
      }
    ],
    'name': 'addKeepers',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address[]',
        'name': 'oracles_',
        'type': 'address[]'
      }
    ],
    'name': 'addOracles',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'discount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'bronze',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'silver',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'gold',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'feeConfiguration',
    'outputs': [
      {
        'internalType': 'address',
        'name': 'feeRecipient',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'autoResolveFee',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'protocolFee',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'flashloanFee',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'immutableConfiguration',
    'outputs': [
      {
        'internalType': 'contract IFoxifyBlacklist',
        'name': 'blacklist',
        'type': 'address'
      },
      {
        'internalType': 'contract IFoxifyAffiliation',
        'name': 'affiliation',
        'type': 'address'
      },
      {
        'internalType': 'contract IPositionToken',
        'name': 'positionTokenAccepter',
        'type': 'address'
      },
      {
        'internalType': 'contract IERC20Stable',
        'name': 'stable',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'keepers',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'keeper',
        'type': 'address'
      }
    ],
    'name': 'keepersContains',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'keepersCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'limitsConfiguration',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'minStableAmount',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'minOrderRate',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'maxOrderRate',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'minDuration',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'maxDuration',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'oracles',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'oracle',
        'type': 'address'
      }
    ],
    'name': 'oraclesContains',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'oraclesCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'oraclesWhitelist',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'oracle',
        'type': 'address'
      }
    ],
    'name': 'oraclesWhitelistContains',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'oraclesWhitelistCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address[]',
        'name': 'keepers_',
        'type': 'address[]'
      }
    ],
    'name': 'removeKeepers',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address[]',
        'name': 'oracles_',
        'type': 'address[]'
      }
    ],
    'name': 'removeOracles',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address[]',
        'name': 'oracles_',
        'type': 'address[]'
      }
    ],
    'name': 'removeOraclesWhitelist',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'swapper',
    'outputs': [
      {
        'internalType': 'contract ISwapperConnector',
        'name': 'connector',
        'type': 'address'
      },
      {
        'internalType': 'bytes',
        'name': 'path',
        'type': 'bytes'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'bronze',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'silver',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'gold',
            'type': 'uint256'
          }
        ],
        'internalType': 'struct ICoreConfiguration.NFTDiscountLevel',
        'name': 'discount_',
        'type': 'tuple'
      }
    ],
    'name': 'updateDiscount',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'address',
            'name': 'feeRecipient',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'autoResolveFee',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'protocolFee',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'flashloanFee',
            'type': 'uint256'
          }
        ],
        'internalType': 'struct ICoreConfiguration.FeeConfiguration',
        'name': 'config',
        'type': 'tuple'
      }
    ],
    'name': 'updateFeeConfiguration',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'minStableAmount',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'minOrderRate',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'maxOrderRate',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'minDuration',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'maxDuration',
            'type': 'uint256'
          }
        ],
        'internalType': 'struct ICoreConfiguration.LimitsConfiguration',
        'name': 'config',
        'type': 'tuple'
      }
    ],
    'name': 'updateLimitsConfiguration',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'contract ISwapperConnector',
            'name': 'swapperConnector',
            'type': 'address'
          },
          {
            'internalType': 'bytes',
            'name': 'path',
            'type': 'bytes'
          }
        ],
        'internalType': 'struct ICoreConfiguration.Swapper',
        'name': 'swapper_',
        'type': 'tuple'
      }
    ],
    'name': 'updateSwapper',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];
