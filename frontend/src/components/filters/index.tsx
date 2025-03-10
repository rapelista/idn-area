"use client";

import { Box, Text } from "@mantine/core";
import { useState } from "react";
import { AsyncAutocomplete } from "../core/async-autocomplete";

export function Filters() {
  const [provinceCode, setProvinceCode] = useState<string | null>(null);
  const [regencyCode, setRegencyCode] = useState<string | null>(null);
  const [districtCode, setDistrictCode] = useState<string | null>(null);
  const [villageCode, setVillageCode] = useState<string | null>(null);

  const updateProvinceCode = (value: string | null) => {
    setProvinceCode(value);
    updateRegencyCode(null);
  };

  const updateRegencyCode = (value: string | null) => {
    setRegencyCode(value);
    updateDistrictCode(null);
  };

  const updateDistrictCode = (value: string | null) => {
    setDistrictCode(value);
    updateVillageCode(null);
  };

  const updateVillageCode = (value: string | null) => {
    setVillageCode(value);
  };

  return (
    <>
      <Box
        p="md"
        bg="blue.0"
        style={{ borderRadius: "var(--mantine-radius-default)" }}
      >
        <Text fz="xs">
          <Text inherit component="span" fw={600}>
            *)
          </Text>{" "}
          Pilih provinsi, kabupaten/kota, kecamatan, dan desa/kelurahan untuk
          menampilkan data ketersediaan dapur.
        </Text>
      </Box>

      <AsyncAutocomplete
        clearable
        label="Provinsi"
        placeholder="Pilih provinsi&hellip;"
        context="provinces"
        value={provinceCode}
        onValueChange={updateProvinceCode}
      />

      <AsyncAutocomplete
        clearable
        key={`regencies-${provinceCode}`}
        label="Kabupaten/Kota"
        placeholder="Pilih kabupaten/kota&hellip;"
        context="regencies"
        params={{ province_code: provinceCode || "" }}
        value={regencyCode}
        onValueChange={updateRegencyCode}
      />

      <AsyncAutocomplete
        clearable
        key={`districts-${regencyCode}`}
        label="Kecamatan"
        placeholder="Pilih kecamatan&hellip;"
        context="districts"
        params={{ regency_code: regencyCode || "" }}
        value={districtCode}
        onValueChange={updateDistrictCode}
      />

      <AsyncAutocomplete
        clearable
        key={`villages-${districtCode}`}
        label="Desa/Kelurahan"
        placeholder="Pilih desa/kelurahan&hellip;"
        context="villages"
        params={{ district_code: districtCode || "" }}
        value={villageCode}
        onValueChange={updateVillageCode}
      />
    </>
  );
}
