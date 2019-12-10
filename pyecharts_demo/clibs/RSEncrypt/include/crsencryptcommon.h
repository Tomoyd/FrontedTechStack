#ifndef CRSENCRYPTCOMMON_H
#define CRSENCRYPTCOMMON_H

#include <string>
#include <vector>
#include <memory.h>
#include <memory>
#include <cmath>
// PCL
#include <pcl/point_types.h>
#include <pcl/point_cloud.h>
#include <pcl/io/pcd_io.h>
// C++
#include <fstream>
#include <iostream>

//#include <QFile>
//#include <QXmlStreamReader>
//#include <QXmlStreamWriter>

namespace RS_Encrypt
{
// 定义点云的文件格式
enum class RS_POINT_FORMAT : int
{
    RS_LABEL_POINTXYZI_FORMAT = 0,
    RS_LABEL_POINTXYZRGB_FORMAT
};

// 定义加密的版本
enum class RS_DATA_ENCRYPT_VERSION : int
{
    RS_DATA_ENCRYPT_VERSION_NON_NON = -1,
    RS_DATA_ENCRYPT_VERSION_000_000 =  0,
    RS_DATA_ENCRYPT_VERSION_000_001 =  1
};

// 定义加密的key的信息
struct st_RSEncryptConfig
{
    RS_DATA_ENCRYPT_VERSION   m_dataEncryptMajorVersion;
    RS_DATA_ENCRYPT_VERSION   m_dataEncryptMinorVersion;
    std::string               m_keyEncrypt;
    std::string               m_keyVI;
    std::string               m_sKeyBinOffset;
    int                       m_keyBinOffset;

    st_RSEncryptConfig()
    {
        m_dataEncryptMajorVersion = RS_DATA_ENCRYPT_VERSION::RS_DATA_ENCRYPT_VERSION_NON_NON;
        m_dataEncryptMinorVersion = RS_DATA_ENCRYPT_VERSION::RS_DATA_ENCRYPT_VERSION_NON_NON;
    }
};

// 定义加密的key的全部版本集合
struct st_RSRoboDataConfig
{
    std::vector<st_RSEncryptConfig> m_rsEncryptConfigs;
};

}

#endif // CRSENCRYPTCOMMON_H
