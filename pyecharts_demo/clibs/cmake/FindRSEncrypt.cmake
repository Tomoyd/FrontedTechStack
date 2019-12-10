include(FindPackageHandleStandardArgs)
unset(RSENCRYPT_FOUND)

set(RSENCRYPT_BUILD_DIR ${CMAKE_CURRENT_SOURCE_DIR}/RSEncrypt)
set(RSENCRYPT_INCLUDE_DIR ${RSENCRYPT_BUILD_DIR}/include)

find_library(RSENCRYPT_LIBRARY
        NAMES librsroboencrypt.so
        PATHS ${RSENCRYPT_BUILD_DIR}/lib NO_DEFAULT_PATH)

# set RSENCRYPT_FOUND
message("${RSENCRYPT_INCLUDE_DIR}")
message("${RSENCRYPT_LIBRARY}")

find_package_handle_standard_args(RSENCRYPT_FOUND DEFAULT_MSG RSENCRYPT_INCLUDE_DIR
        RSENCRYPT_LIBRARY)

# set external variables for usage in CMakeLists.txt
if (RSENCRYPT_FOUND)
    set(RSENCRYPT_INCLUDE_DIR ${RSENCRYPT_INCLUDE_DIR})
    message("Found RSEncrypt")
endif ()

# hide locals from GUI
mark_as_advanced(RSENCRYPT_INCLUDE_DIR)