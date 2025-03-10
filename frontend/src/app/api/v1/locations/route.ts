import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { createLocation, getLocations } from "~/handlers/locations";
import { paramsSchema } from "~/schemas/core";
import { locationSchema } from "~/schemas/location";
import { mapErrors } from "~/utils";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const validation = paramsSchema.safeParse(Object.fromEntries(params));

  if (!validation.success) {
    const errors = mapErrors(validation.error);
    return NextResponse.json({
      errors,
    });
  }

  const { page, limit, search, ...filters } = validation.data;
  const locations = await getLocations();

  /**
   * Filtering
   */
  const filtered = _(locations)
    .filter(({ name }) => {
      if (!name) return false;
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

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = locationSchema.safeParse(body);

  if (!validation.success) {
    const errors = mapErrors(validation.error);
    return NextResponse.json({ errors }, { status: 400 });
  }

  const location = validation.data;
  const data = await createLocation(location);

  return NextResponse.json({ data }, { status: 201 });
}
