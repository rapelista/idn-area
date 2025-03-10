import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { getDistricts } from "~/handlers/districts";
import { districtParamsSchema } from "~/schemas/district";
import { mapErrors } from "~/utils";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const validation = districtParamsSchema.safeParse(Object.fromEntries(params));

  if (!validation.success) {
    const errors = mapErrors(validation.error);
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { page, limit, search, ...filters } = validation.data;
  const districts = await getDistricts();

  /**
   * Filtering
   */
  const filtered = _(districts)
    .filter(({ name }) => {
      return name.toLowerCase().includes(search.toLowerCase());
    })
    .filter(filters)
    .value();

  /**
   * Pagination
   */
  const data = _(filtered)
    .drop((page - 1) * limit)
    .take(limit)
    .value();

  return NextResponse.json({
    data,
    meta: {
      page,
      totalData: filtered.length,
      totalPage: Math.ceil(filtered.length / limit),
    },
  });
}
